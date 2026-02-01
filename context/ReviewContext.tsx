// Reviews & Ratings Context
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "./ToastContext";

export interface Review {
  id: string;
  dishId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  helpful: number;
  verified: boolean;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (dishId: string, rating: number, comment: string, images?: string[]) => void;
  getReviewsForDish: (dishId: string) => Review[];
  getAverageRating: (dishId: string) => number;
  markHelpful: (reviewId: string) => void;
}

const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  addReview: () => {},
  getReviewsForDish: () => [],
  getAverageRating: () => 0,
  markHelpful: () => {},
});

export const useReviews = () => useContext(ReviewContext);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user, isAuthenticated } = useAuth();
  const { success, error } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("swadika_reviews");
    if (saved) {
      const parsed = JSON.parse(saved);
      setReviews(
        parsed.map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt),
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem("swadika_reviews", JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = (dishId: string, rating: number, comment: string, images?: string[]) => {
    if (!isAuthenticated || !user) {
      error("Please login to add a review");
      return;
    }

    const newReview: Review = {
      id: `REV${Date.now()}`,
      dishId,
      userId: user.id,
      userName: user.name,
      rating,
      comment,
      images,
      createdAt: new Date(),
      helpful: 0,
      verified: true, // In production, check if user ordered this dish
    };

    setReviews((prev) => [newReview, ...prev]);
    success("Review added successfully! ⭐");
  };

  const getReviewsForDish = (dishId: string) => {
    return reviews.filter((r) => r.dishId === dishId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  const getAverageRating = (dishId: string) => {
    const dishReviews = getReviewsForDish(dishId);
    if (dishReviews.length === 0) return 0;
    return dishReviews.reduce((sum, r) => sum + r.rating, 0) / dishReviews.length;
  };

  const markHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r))
    );
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
        getReviewsForDish,
        getAverageRating,
        markHelpful,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}
