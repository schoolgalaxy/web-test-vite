// Utility to load widget data from the widgets directory
interface Quiz {
  id: string;
  name: string;
  displayName: string;
  description: string;
  route: string;
  routePrefix: string;
  category: string;
  icon: string;
  iconAlt: string;
  active: boolean;
  priority: number;
}

interface WidgetData {
  title?: string;
  name?: string;
  quizzes: Quiz[];
}

// Import the widget files statically since we know their exact names
import kidsWidget from '../assets/widget/kids.json';
import planetWidget from '../assets/widget/planet.json';

// Initialize widgets array with the imported data
const widgets: WidgetData[] = [];

// Add widgets if they have valid data
if (kidsWidget && kidsWidget.quizzes) {
  widgets.push(kidsWidget);
}

if (planetWidget && planetWidget.quizzes) {
  widgets.push(planetWidget);
}

export const loadWidgetsData = (): WidgetData[] => {
  return widgets;
};

// Get all quizzes from all widgets, flattened into a single array
export const getAllQuizzes = (): Quiz[] => {
  const widgets = loadWidgetsData();
  const allQuizzes: Quiz[] = [];

  widgets.forEach(widget => {
    if (widget.quizzes) {
      allQuizzes.push(...widget.quizzes);
    }
  });

  return allQuizzes;
};

// Get active quizzes sorted by priority
export const getActiveQuizzes = (): Quiz[] => {
  const allQuizzes = getAllQuizzes();
  return allQuizzes
    .filter((quiz: Quiz) => quiz.active)
    .sort((a: Quiz, b: Quiz) => a.priority - b.priority);
};

// Get widget by title/name
export const getWidgetByName = (name: string): WidgetData | undefined => {
  const widgets = loadWidgetsData();
  return widgets.find(widget =>
    widget.title === name || widget.name === name
  );
};