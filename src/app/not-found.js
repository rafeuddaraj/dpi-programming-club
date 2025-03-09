import ErrorPage from "@/components/common/error";

export default function notFound() {
  return (
    <>
      <ErrorPage
        errorType="404"
        message={
          "Oops! The page you are looking for doesn't exist. It might have been moved or deleted."
        }
      />
    </>
  );
}
