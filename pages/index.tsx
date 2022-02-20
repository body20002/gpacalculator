import { useEffect, useState } from "react";
import Head from "next/head";

import ColorPicker from "../components/ColorPicker";

const grades = [
  ["A+", 4],
  ["A", 3.7],
  ["B+", 3.3],
  ["B", 3],
  ["C+", 2.7],
  ["C", 2.4],
  ["D+", 2.2],
  ["D", 2],
  ["F", 0],
];

const courses = [1, 2, 3, 4, 5, 6, 7];

const themes = [
  "theme-red",
  "theme-orange",
  "theme-yellow",
  "theme-green",
  "theme-teal",
  "theme-lime",
  "theme-sky",
  "theme-violet",
];

const GradeComponent = ({
  course,
  placeholder,
  userGrades,
  setUserGrades,
  userHours,
  setUserHours,
}: {
    course: string;
    placeholder: string;
    userGrades: object;
    setUserGrades: Function;
    userHours: object;
    setUserHours: Function;
  }) => {
  return (
    <div className="flex justify-between mb-4 mx-2">
      <input
        type="text"
        name={course}
        id={course}
        className="border rounded px-1 py-2 w-1/2 sm:w-2/3"
        placeholder={placeholder}
        />
      <select
        required
        name={course}
        id={`${course}-select-hours`}
        className="border rounded bg-skin-primary"
        defaultValue="Cr. H"
        onChange={(e) => {
          const tmp: any = userHours;
          const courseId =
            (document.getElementById(course) as HTMLInputElement).value ||
              course;
          tmp[courseId] = e.target.value;
          setUserHours(tmp);
        }}
      >
        <option disabled value="Cr. H">
          Cr. H
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <select
        required
        name={course}
        id={`${course}-select-grades`}
        className="border rounded bg-skin-primary"
        defaultValue="Grade"
        onChange={(e) => {
          const tmp: any = userGrades;
          const courseId =
            (document.getElementById(course) as HTMLInputElement).value ||
              course;
          tmp[courseId] = e.target.value;
          setUserGrades(tmp);
        }}
      >
        <option disabled value="Grade">
          Grade
        </option>
        {grades.map((grade) => (
          <option key={grade[1]} value={grade[1]}>
            {grade[0]}
          </option>
        ))}
      </select>
      <button
        className="border rounded bg-skin-secondary px-4"
        onClick={() => {
          const courseId: string =
            (document.getElementById(course) as HTMLInputElement).value ||
              course;

          let tmp: any = userGrades;
          tmp[courseId] = 0;
          setUserGrades(tmp);

          tmp = userHours;
          tmp[courseId] = 0;
          setUserHours(tmp);

          (
            document.getElementById(
              `${course}-select-hours`
            ) as HTMLInputElement
          ).value = "Cr. H";

          (
            document.getElementById(
              `${course}-select-grades`
            ) as HTMLInputElement
          ).value = "Grade";

          (document.getElementById(course) as HTMLInputElement).value = "";
        }}
      >
        X
      </button>
    </div>
  );
};

const handleGPA = (
  grades: any,
  hours: any,
  setGPA: Function,
  setClicked: Function,
  setCGPA: Function
) => {

  if (JSON.stringify(Object.keys(grades).sort()) !== JSON.stringify(Object.keys(hours).sort())){
    document.getElementById("GPA")?.classList.add("animate-wiggle");
    sleep(500).then(() => {
      document.getElementById("GPA")?.classList.remove("animate-wiggle");
    });
    return;
  }

  const keys: string[] = Object.keys(grades);
  const results: any = {};

  keys.forEach((key: any) => {

    results[key] = grades[key] * hours[key];
  });

  const resultsValue: any = Object.values(results).reduce(function (
    accumVariable,
    curValue
  ): number {
      return Number(accumVariable) + Number(curValue);
    },
    0);

  const hoursValue: any = Object.values(hours).reduce(function (
    accumVariable,
    curValue
  ) {
      return Number(accumVariable) + Number(curValue);
    },
    0);
  if (hoursValue === 0 || resultsValue === 0) {
    document.getElementById("GPA")?.classList.add("animate-wiggle");
    sleep(500).then(() => {
      document.getElementById("GPA")?.classList.remove("animate-wiggle");
    });
    return;
  }

  const finalResult = (resultsValue / hoursValue).toFixed(2);
  setGPA(finalResult);
  setCGPA(0);
  setClicked(false);

  const GPAResultElem = document.getElementById("GPAResult");
  GPAResultElem?.classList.add("animate-zoom-in");
  sleep(500).then(() => {
    GPAResultElem?.classList.remove("animate-zoom-in");
  });
};

function Home() {
  const [userGrades, setUserGrades] = useState<any>({});
  const [userHours, setUserHours] = useState<any>({});
  const [GPA, setGPA] = useState(0);
  const [CGPA, setCGPA] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [theme, setTheme] = useState(themes[0]);

  useEffect(() => {}, [theme]);

  return (
    <>
      <Head>
        <title>GPA Calculator</title>
      </Head>
      <div id="themable" className="h-screen w-full">
        <div className="flex flex-col justify-content items-center w-full">
          <div
            className={
            GPA !== 0 && CGPA === 0 && !clicked
              ? "z-10 absolute w-screen h-screen bg-black bg-opacity-75"
              : "hidden"
          }
            onClick={() => {
              const GPAResultElem = document.getElementById("GPAResult");
              GPAResultElem?.classList.add("animate-zoom-out");
              sleep(500).then(() => {
                GPAResultElem?.classList.remove("animate-zoom-out");
                setClicked(!clicked);
              });
            }}
          >
            <div className="calculation-result" id="GPAResult">
              Congratulations! Your GPA is {GPA}
            </div>
          </div>
          <div
            className={
            CGPA !== 0 && !clicked
              ? "z-10 absolute w-screen h-screen bg-black bg-opacity-75"
              : "hidden"
          }
            onClick={() => {
              const GPAResultElem = document.getElementById("CGPAResult");
              GPAResultElem?.classList.add("animate-zoom-out");
              sleep(500).then(() => {
                GPAResultElem?.classList.remove("animate-zoom-out");
                setClicked(!clicked);
              });
            }}
          >
            <div className="calculation-result" id="CGPAResult">
              Congratulations! Your CGPA is {CGPA}
            </div>
          </div>
          <div
            className="border flex justify-center flex-col py-2 w-full"
            id="GPA"
          >
            <div className="flex justify-center items-center mb-2">
              Grade Point Average (GPA)
            </div>
            <div className="flex flex-col justify-end ">
              {courses.map((course) => (
                <GradeComponent
                  course={`course_${course}`}
                  key={course}
                  placeholder={`Course ${course}`}
                  userGrades={userGrades}
                  setUserGrades={setUserGrades}
                  userHours={userHours}
                  setUserHours={setUserHours}
                  />
              ))}
              <div className="flex justify-between mx-2">
                <button
                  className="bg-skin-primary rounded py-2 px-4 w-full mr-2"
                  onClick={() => {
                    handleGPA(
                      userGrades,
                      userHours,
                      setGPA,
                      setClicked,
                      setCGPA
                    );
                  }}
                >
                  Calculate GPA
                </button>
                {/* <button className="bg-muted rounded py-2 px-4 w-1/2">Show Calculation</button> */}
              </div>
            </div>
          </div>
          <div className="border py-2 flex flex-col mt-2 w-full">
            <div
              className="border flex justify-center flex-col py-2 w-full"
              id="CGPA"
            >
              <div className="flex justify-center items-center mb-2">
                Cumulative GPA (CGPA)
              </div>
              <div className="flex flex-col justify-end">
                <input
                  type="text"
                  placeholder="Old GPA"
                  className="border py-2 px-1 mb-4 mx-2 rounded"
                  id="oldGPA"
                  />
                <input
                  type="text"
                  placeholder="Old Hours done"
                  className="border py-2 px-1 mb-4 mx-2 rounded"
                  id="oldHours"
                  />
                <div className="flex justify-between mx-2">
                  <button
                    className="bg-skin-primary rounded py-2 px-4 w-full mr-2"
                    onClick={() =>
                      handleCGPA(GPA, userHours, setCGPA, setClicked)
                  }
                  >
                    Calculate CGPA
                  </button>
                  {/* <button className='bg-muted rounded py-2 px-4 w-1/2'>Show Calculation</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="fill-skin-primary sticky z-10 bottom-8 w-16 h-16 mx-auto mr-8 hover:fill-skin-hover"
          onClick={() => {
            const themable = document.getElementById("themable");
            // for some weird reason `themable?.classList.remove(theme)` doesn't work
            // I spent 3 hours trying to find what's wrong with the above code with no success :/

            // @ts-ignore
            themable.classList = ["h-screen w-full"];
            setTheme(themes[(themes.indexOf(theme) + 1) % themes.length]);
            console.log(theme);

            themable?.classList.add(theme);
          }}
        >
          <ColorPicker />
        </div>
        <div className="flex justify-center items-center">
          By
          <a
            href="https://github.com/body20002"
            className="text-skin-primary ml-1"
          >
            Abdallah Gamal
          </a>
        </div>
      </div>
      </>
  );
}
function handleCGPA(
  GPA: number,
  userHours: { string: number },
  setCGPA: Function,
  setClicked: Function
) {
  const oldHoursEle = document.getElementById("oldHours");
  const oldGPAEle = document.getElementById("oldGPA");

  const oldHours = Number((oldHoursEle as HTMLInputElement).value);
  const oldGPA = Number((oldGPAEle as HTMLInputElement).value);

  if (oldGPA === 0 || oldHours === 0 || isNaN(oldGPA) || isNaN(oldHours)) {
    document.getElementById("CGPA")?.classList.add("animate-wiggle");
    sleep(500).then(() => {
      document.getElementById("CGPA")?.classList.remove("animate-wiggle");
    });
    return;
  }

  if (GPA === 0 || !userHours) {
    document.getElementById("GPA")?.classList.add("animate-wiggle");
    sleep(500).then(() => {
      document.getElementById("GPA")?.classList.remove("animate-wiggle");
    });
    return;
  }

  const newHours: number = Object.values(userHours).reduce(
    (accumVariable, curValue) => {
      return Number(accumVariable) + Number(curValue);
    },
    0
  );

  const newPoints: number = GPA * newHours;

  const total_hours = Number(oldHours) + Number(newHours);

  const total_points = oldGPA * oldHours + newPoints;

  const CGPA = (total_points / total_hours).toFixed(2);
  setCGPA(CGPA);
  setClicked(false);

  const CGPAResultElem = document.getElementById("CGPAResult");
  CGPAResultElem?.classList.add("animate-zoom-in");
  sleep(500).then(() => {
    CGPAResultElem?.classList.remove("animate-zoom-in");
  });
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default Home;
