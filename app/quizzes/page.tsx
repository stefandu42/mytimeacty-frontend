import { getAll } from "@/services/quizzes.service";
import Quizz from "@/utils/models/quizz";
import Link from "next/link";

export default async function QuizzesHome() {
  const quizzes = await getAll();

  return (
    <main className="h-screen">
      <div className="flex gap-4 flex-wrap">
        {quizzes.map((quizz: Quizz) => (
          <div key={quizz.id} className="carte">
            <div className="card bg-base-100 w-96 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{quizz.title}</h2>
                <div className="card-actions justify-end">
                  <Link
                    href={`/quizzes/${quizz.id}`}
                    className="btn btn-primary"
                  >
                    Voir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
