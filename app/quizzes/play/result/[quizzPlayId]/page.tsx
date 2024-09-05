import QuizzResult from "@/components/quizzes/play/quizzResult";

interface Props {
  params: {
    quizzPlayId: number;
  };
}

export default function QuizzPlayResultPage({ params }: Props) {
  const id = params.quizzPlayId;

  return <QuizzResult quizzPlayId={id} />;
}
