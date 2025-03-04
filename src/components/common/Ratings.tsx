import { Star, StarHalf } from "lucide-react";

export const Ratings = ({
  ratings,
  size = 20,
}: {
  ratings: number;
  size?: number;
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* Container for stars */}
      <div className="relative flex">
        {/* Background black stars */}
        <div className="flex">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={`background-${index}`}
              fill="#ddd"
              strokeWidth={0}
              className=""
              size={size}
            />
          ))}
        </div>

        {/* Foreground colored stars */}
        <div className="absolute inset-0 flex items-center">
          {/* Full stars */}
          {Array.from({ length: Math.floor(ratings) }, (_, index) => (
            <Star
              key={`full-${index}`}
              fill="#FEC000"
              strokeWidth={0}
              className="text-[#FEC000]"
              size={size}
            />
          ))}

          {/* Half star (if applicable) */}
          {ratings % 1 !== 0 && (
            <StarHalf
              key="half-star"
              fill="#FEC000"
              strokeWidth={0}
              className="text-[#FEC000]"
              size={size}
            />
          )}
        </div>
      </div>
    </div>
  );
};
