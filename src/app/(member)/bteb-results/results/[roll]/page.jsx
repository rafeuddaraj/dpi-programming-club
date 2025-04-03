import { getSingleResult } from "@/app/actions/bteb-result";
import ResultComponent from "@/components/common/result-component";
import Navigation from "./_components/navigation";
import ResultCardProvider from "./_components/result-card-provider";
import ResultCardRef from "./_components/result-card-ref";

export default async function ResultPage({
  params: param,
  searchParams: searchParam,
}) {
  const searchParams = await searchParam;
  const params = await param;
  const roll = params?.roll;
  const exam = searchParams?.exam;
  const regulation = searchParams?.regulation;

  if (!roll || !exam || !regulation) {
    throw new Error();
  }

  try {
    const resp = await getSingleResult({ roll, exam, regulation });
    if (resp?.error) {
      throw Error();
    }
    const result = resp?.data;

    return (
      <ResultCardProvider>
        <div className="max-w-4xl mx-auto py-10">
          <div className="mb-6 flex justify-between items-center"></div>
          <Navigation result={result} isNeedBack={true} />
          <ResultCardRef>
            <ResultComponent result={result} isHeader={true} />
          </ResultCardRef>
        </div>
      </ResultCardProvider>
    );
  } catch {
    throw new Error();
  }
}
