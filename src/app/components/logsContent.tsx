import { MdOutlineImage } from "react-icons/md";
import Button from "./Button";

const overview = {
  title: "Log Entry: Project Development Update",
  date: "2007.04.25",
  location: "Research Facility, Planet X-17",
  status: "In Development",
};

const sections = [
  {
    title: "Project Update",
    body: "The development team has been working tirelessly on the latest iteration of the project. Significant progress has been made in the areas of neural interface integration, machine learning algorithms, and quantum computing.",
  },
  {
    title: "Challenges",
    body: "The team has encountered several challenges during the development process, including unexpected system crashes, hardware malfunctions, and unanticipated compatibility issues across new device drivers.",
  },
  {
    title: "Next Steps",
    body: "The development team has been working tirelessly on the latest iteration of the project. Significant progress has been made in the areas of neural interface, machine learning algorithms, and quantum computing.",
  },
  {
    title: "Conclusion",
    body: "Despite the challenges encountered, the team remains optimistic about the potential of the project. The development of advanced neural interfaces and machine learning algorithms continues to unlock promising pathways.",
  },
];

const olderLogs = [
  "Log Entry: Project Development Update",
  "Log Entry: New Project Started",
  "Log Entry: Release Story",
  "Log Entry: Visual Updates",
  "Log Entry: Going Public",
  "Log Entry: Beta Program",
];

export default function LogsContent() {
  return (
    <div className="flex h-full flex-col gap-6 max-w-285 mx-auto">
      <h1 className="text-center title18">Data Log Dump Initialized.</h1>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-primary px-2">
          <p className="font-big text-lg font-bold tracking-[0.2em] text-dark">
            {overview.title}
          </p>
          <span className="title16 !text-dark">Date: {overview.date}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="title16">
            Location:{" "}
            <span className="text-info-light">{overview.location}</span>
          </span>
          <span className="title16">
            Project Status:{" "}
            <span className="text-info-light">{overview.status}</span>
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.title}
            className="flex h-full flex-col justify-between border border-white/15 bg-black px-5 py-4 shadow-[0_0_24px_rgba(0,0,0,0.35)]"
          >
            <div className="space-y-1">
              <p className="font-big title18 font-bold text-primary">
                {section.title}
              </p>
              <p className="title14 !text-info-light">{section.body}</p>
            </div>
            <button
              type="button"
              className="mt-2 w-max cursor-pointer text-sm tracking-widest text-primary transition uppercase hover:text-primary-70"
            >
              + Expand
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-72 sm:max-w-80">
          <Button
            label="Preview Visual Records"
            icon={<MdOutlineImage className="text-xl" />}
            variant="outlined"
            className="bg-transparent text-primary hover:border-primary-70"
          />
        </div>
      </div>

      <div className="space-y-1 border-t border-white/10 pt-6">
        <p className="title18">Older Logs:</p>
        <div className="space-y-2">
          {olderLogs.map((title) => (
            <div
              key={title}
              className="flex items-center justify-between border border-primary px-2 py-1 text-primary"
            >
              <h1 className="title18 font-big text-primary font-bold">
                {title}
              </h1>
              <p className="title16 text-primary">
                Date: {overview.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
