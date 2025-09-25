import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/McqList.css'; // Reusing MCQ list styles

interface QuizMetaData {
  id: string;
  name: string;
  description: string;
  profilePic: string;
}

interface QuizListProps {
  quizCategory: string; // e.g., 'birds', 'animals'
  title: string;
  description: string;
  routePrefix: string; // e.g., '/birds-quiz', '/animals-quiz'
}

const QuizList: React.FC<QuizListProps> = ({ quizCategory, title, description, routePrefix }) => {
  const [quizzes, setQuizzes] = useState<QuizMetaData[]>([]);

  useEffect(() => {
    const fetchQuizMetaData = async () => {
      try {
        // Dynamically import all JSON files from the specified category
        const context = import.meta.glob('/src/assets/json_data/**/*.json', { eager: true });
        const quizFiles = Object.keys(context).filter(path => path.includes(`/${quizCategory}/`));

        const allMetaData = quizFiles.map((file) => {
          const module: any = context[file];
          const data = module.default;
          const id = file.split('/').pop()?.replace('.json', '') || '';
          return {
            id: id,
            name: data.title,
            description: data.description,
            profilePic: data.profile_pic_link,
          };
        });
        setQuizzes(allMetaData);
      } catch (error) {
        console.error(`Error fetching quiz metadata for ${quizCategory}:`, error);
      }
    };

    fetchQuizMetaData();
  }, [quizCategory]);

  return (
    <div className="mcq-list-container">
      <h2 className="mcq-list-title">{title}</h2>
      <p>{description}</p>
      <div className="mcq-tiles-grid">
        {quizzes.map((quiz) => (
          <Link to={`${routePrefix}/${quiz.id}`} key={quiz.id} className="mcq-tile-link">
            <div className="mcq-tile">
              {/* {quiz.profilePic && (
                <img src={quiz.profilePic} alt={quiz.name} className="mcq-tile-profile-pic" />
              )} */}
              <h3 className="mcq-tile-name">{quiz.name}</h3>
              <p className="mcq-tile-description">{quiz.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuizList;