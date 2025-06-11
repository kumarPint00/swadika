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

