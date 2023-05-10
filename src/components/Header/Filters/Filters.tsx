import { useEffect, useState } from "react";
import { sortButtonsTexts } from "../constants";
import { AllSortTypes, SortTypes } from "../types";
import { useWindowSize } from "@/hooks/useWindowSize";
import Filter from "./Filter";

interface FiltersProps {
  handleSortChange: (sortType: SortTypes) => void;
  setSelectedLang: (lang: string) => void;
  langs: string[];
  activeSortType: AllSortTypes | undefined;
  selectedLang: string;
}

export default function Filters({
  langs,
  setSelectedLang,
  handleSortChange,
  activeSortType,
  selectedLang,
}: FiltersProps) {
  const { isMediumUp } = useWindowSize();
  const [shouldShowFilters, setShouldShowFilters] = useState(true);

  // Hides filters on medium or smaller screens
  useEffect(() => {
    setShouldShowFilters(isMediumUp);
  }, [isMediumUp]);

  return (
    <div
      dir="rtl"
      className="min-h-8 mt-3 sm:mt-0 gap-2.5 flex flex-wrap flex-col md:flex-row w-full md:items-center"
    >
      <label className="flex flex-row items-center h-8 gap-2 opacity-70">
        <input
          type="checkbox"
          title="הצגת מסננים"
          id="filter"
          checked={shouldShowFilters}
          onChange={(e) => setShouldShowFilters(e.target.checked)}
        />
        {shouldShowFilters ? "מיין לפי:" : "הצג מסננים"}
      </label>
      {shouldShowFilters && (
        <>
          {Object.keys(sortButtonsTexts).map((sortType) => {
            if(sortType==='default') return;
            return <Filter
              key={sortType}
              sortType={sortType}
              activeSortType={activeSortType}
              onSortChange={handleSortChange}
              setShouldShowFilters={setShouldShowFilters}
            />
          })}
          <select
            className="h-8 font-['Rubik'] sm:text-base text-sm focus-visible:ring-2 rounded-md px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover active:bg-buttonactive text-white"
            name="languages"
            id="selectLang"
            title="סינון לפי שפה"
            value={selectedLang}
            onChange={(e) => {
              setSelectedLang(e.currentTarget.value);
              if (!isMediumUp) setShouldShowFilters(false);
            }}
          >
            <option value="">כל שפה</option>
            {langs.map((lang) => (
              <option key={lang} value={lang} dir="ltr">
                {lang}
              </option>
            ))}
          </select>
          <button
            className="flex justify-between flex-row items-center gap-3 h-8 text-sm hover:cursor-default focus-visible:ring-2 font-['Rubik'] rounded-md px-4 bg-mydarkblue border-none outline outline-1 outline-myblue transition hover:bg-buttonhover text-white"
            onClick={() => {
              handleSortChange("default");
              setSelectedLang("");
            }}
          >
            איפוס
          </button>
        </>
      )}
    </div>
  );
}
