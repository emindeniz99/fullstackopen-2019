import React from "react";

const Header = props => {
    return <h1>{props.course}</h1>;
};

const Content = props => {
    return (
        <>
            {props.parts.map(part => (
                <Part
                    key={part.id}
                    part={part.name}
                    exercise={part.exercises}
                />
            ))}
        </>
    );
};

const Part = props => {
    return (
        <p>
            {props.part} {props.exercise}
        </p>
    );
};

const Total = props => {
    return (
        <strong>
            {" "}
            total of{" "}
            {props.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
            exercises
		</strong>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;
