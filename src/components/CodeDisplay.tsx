import React from "react";
import ReactMarkdown from "react-markdown";
import { AlgorithmMarkdown, AlgorithmType } from "../types/sorting";

interface CodeDisplayProps {
  selectedAlgorithm: AlgorithmType;
  selectedLanguage: "javascript" | "java";
  setSelectedLanguage: (lang: "javascript" | "java") => void;
  algorithmMarkdown: AlgorithmMarkdown;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  selectedAlgorithm,
  selectedLanguage,
  setSelectedLanguage,
  algorithmMarkdown,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">구현 코드</h2>
      <div className="space-y-4">
        <div className="flex space-x-4">
          {["javascript", "java"].map((lang) => (
            <button
              key={lang}
              className={`px-4 py-2 rounded-md ${
                selectedLanguage === lang
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedLanguage(lang as "javascript" | "java")}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <ReactMarkdown
            className={`prose max-w-none dark:prose-invert p-4 language-${selectedLanguage}`}
          >
            {algorithmMarkdown[selectedAlgorithm][selectedLanguage]}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;
