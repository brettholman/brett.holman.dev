import React from "react";
import { CommandResponse } from "../../models/commandResponse";
import { CommandStatusCode } from "../../models/commandStatusCode";

const output = (
  <div>
    <h1>FORMAT</h1>
    Key Skills: - Full Stack Development: Adept at both frontend and backend
    development, I thrive in delivering end-to-end solutions that align with
    business objectives. - Serverless Technologies: Specialized in architecting
    serverless solutions leveraging AWS services to enhance scalability,
    performance, and cost-effectiveness. - Cross-functional Collaboration:
    Proven ability to collaborate seamlessly with cross-functional teams to
    transform requirements into high-quality, efficient code. - Problem Solving:
    Known for my analytical mindset and creative problem-solving skills, I excel
    in tackling complex challenges and optimizing existing systems. Full Stack
    Software Engineer | 7+ Years of Expertise Passionate about crafting robust
    and scalable solutions, I am a seasoned Full Stack Software Engineer with
    over 7 years of hands-on experience in the dynamic realm of software
    development. My proficiency spans a diverse array of languages, including
    Typescript/Node, Java, Scala, Python, .NET, and React. Technical
    Proficiency: - Languages: Typescript/Node, Java, Scala, Python, .NET, React
    - Technologies: Serverless Architectures, AWS (Lambda, API Gateway, S3,
    DynamoDB), Docker, Kubernetes - Frameworks: Express.js, Spring Boot, Flask -
    Frontend: React, Redux, HTML5, CSS3 - Backend: RESTful APIs, Microservices,
    Serverless Computing
  </div>
);

export const useAboutMe = () => {
  const aboutMe = (): CommandResponse => {
    return {
      output,
      statusCode: CommandStatusCode.SUCCESS,
    } as CommandResponse;
  };

  return { aboutMe };
};
