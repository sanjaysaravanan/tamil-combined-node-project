let students = [
  {
    id: "1",
    name: "Rakesh",
    course: "MERN/MEAN Stack Development",
    batch: "TAMIL-WEEKEND",
    teacherId: null,
  },
  {
    id: "1716627420375",
    teacherId: "1",
    name: "Vignesh",
    course: "MERN/MEAN Stack Development",
    batch: "TAMIL-WEEKEND",
  },
];

let teachers = [
  {
    id: "1",
    name: "Sanjay",
    course: "MERN/MEAN Stack Development",
    batch: "Tamil-Weekend",
    students: ["1716627420375"],
  },
];

export { students, teachers };
