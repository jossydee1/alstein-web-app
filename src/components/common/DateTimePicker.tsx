import React from "react";
import { Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

type Time = {
  hours: string;
  minutes: string;
};

interface DateTimePickerProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  fromTime: Time;
  setFromTime: React.Dispatch<React.SetStateAction<Time>>;
  toTime: Time;
  setToTime: React.Dispatch<React.SetStateAction<Time>>;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  setDate,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  return (
    <div className="rounded-md border">
      <div className="mx-4 mt-2 flex flex-wrap gap-x-4 gap-y-2 border-b py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#676767]">From:</span>
          <div className="flex items-center gap-1 p-1">
            <Clock size={16} className="text-[#676767]" />
            <select
              value={fromTime.hours}
              onChange={e =>
                setFromTime(prev => ({ ...prev, hours: e.target.value }))
              }
              className="w-14 rounded-md border-gray-300 px-1 py-0.5 text-sm outline-none"
            >
              {hours.map(h => (
                <option key={`from-h-${h}`} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <span>:</span>
            <select
              value={fromTime.minutes}
              onChange={e =>
                setFromTime(prev => ({ ...prev, minutes: e.target.value }))
              }
              className="w-14 rounded-md border-gray-300 px-1 py-0.5 text-sm outline-none"
            >
              {minutes.map(m => (
                <option key={`from-m-${m}`} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#676767]">To:</span>
          <div className="flex items-center gap-1 p-1">
            <Clock size={16} className="text-[#676767]" />
            <select
              value={toTime.hours}
              onChange={e =>
                setToTime(prev => ({ ...prev, hours: e.target.value }))
              }
              className="w-14 rounded-md border-gray-300 px-1 py-0.5 text-sm outline-none"
            >
              {hours.map(h => (
                <option key={`to-h-${h}`} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <span>:</span>
            <select
              value={toTime.minutes}
              onChange={e =>
                setToTime(prev => ({ ...prev, minutes: e.target.value }))
              }
              className="w-14 rounded-md border-gray-300 px-1 py-0.5 text-sm outline-none"
            >
              {minutes.map(m => (
                <option key={`to-m-${m}`} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Calendar
        mode="range"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
      />
    </div>
  );
};

export default DateTimePicker;
