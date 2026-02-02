#!/usr/bin/env python3
import re
import sys

def fix_grid_syntax(content):
    # Fix Grid import
    content = re.sub(
        r'import Grid from "@mui/material/Grid2";',
        r'import Grid from "@mui/material/Grid";',
        content
    )
    
    # Fix malformed Grid size syntax - find patterns like:
    # <Grid size={{ xs: 12, sm: 6, md: 3 key={index}>
    # Should be: <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
    
    # Pattern: <Grid size={{ ... WITHOUT closing }} before next attribute or >
    # Replace with properly closed version
    content = re.sub(
        r'<Grid size=\{\{ ([^}]+) (key=|>)',
        r'<Grid size={{ \1 }} \2',
        content
    )
    
    # Fix Grid item xs={12} to Grid size={{ xs: 12 }}
    # Simple case: <Grid item xs={12}>
    content = re.sub(
        r'<Grid item xs=\{(\d+)\}>',
        r'<Grid size={{ xs: \1 }}>',
        content
    )
    
    # Two props: <Grid item xs={12} md={6}>
    content = re.sub(
        r'<Grid item xs=\{(\d+)\} md=\{(\d+)\}>',
        r'<Grid size={{ xs: \1, md: \2 }}>',
        content
    )
    
    # Three props: <Grid item xs={12} sm={6} md={4}>
    content = re.sub(
        r'<Grid item xs=\{(\d+)\} sm=\{(\d+)\} md=\{(\d+)\}>',
        r'<Grid size={{ xs: \1, sm: \2, md: \3 }}>',
        content
    )
    
    # Four props: <Grid item xs={12} sm={6} md={4} lg={3}>
    content = re.sub(
        r'<Grid item xs=\{(\d+)\} sm=\{(\d+)\} md=\{(\d+)\} lg=\{(\d+)\}>',
        r'<Grid size={{ xs: \1, sm: \2, md: \3, lg: \4 }}>',
        content
    )
    
    return content

if __name__ == "__main__":
    filename = sys.argv[1]
    with open(filename, 'r') as f:
        content = f.read()
    
    fixed_content = fix_grid_syntax(content)
    
    with open(filename, 'w') as f:
        f.write(fixed_content)
    
    print(f"Fixed {filename}")
