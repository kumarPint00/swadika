export function iCalEvent(title:string,desc:string,start:Date,end:Date){
  const pad=(n:number)=>String(n).padStart(2,"0");
  const fmt=(d:Date)=>d.getUTCFullYear()+
    pad(d.getUTCMonth()+1)+pad(d.getUTCDate())+"T"+
    pad(d.getUTCHours())+pad(d.getUTCMinutes())+"00Z";
  return (
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${desc}
DTSTART:${fmt(start)}
DTEND:${fmt(end)}
END:VEVENT
END:VCALENDAR`
  );
}

export function downloadICal(title:string,desc:string,start:Date,end:Date){
  const blob=new Blob([iCalEvent(title,desc,start,end)],{type:"text/calendar"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=`${title.replace(/\s+/g,"_")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function formatDate(date:Date,options:Intl.DateTimeFormatOptions={}){
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(date);
}