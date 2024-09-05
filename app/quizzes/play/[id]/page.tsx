import QuizzPlayer from "@/components/quizzes/play/quizzPlay";

interface Props {
  params: {
    id: number;
  };
}

export default function QuizzPlayPage({ params }: Props) {
  const id = params.id;

  return <QuizzPlayer quizzId={id} />;
}
