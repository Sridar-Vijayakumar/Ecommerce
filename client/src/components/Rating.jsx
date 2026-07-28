import { Star } from "lucide-react";

const Rating = ({ value = 0, text }) => (
  <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={15}
        className={value >= star - 0.5 ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-300"}
      />
    ))}
    {text && <span className="ml-1.5 text-xs font-medium text-slate-500">{text}</span>}
  </div>
);

export default Rating;
