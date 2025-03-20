import { getSettings } from "@/app/actions/settings";
import { isExpiredDate } from "@/lib/utils";
import RegistrationClosed from "./_components/registration-close";
import RegisterForm from "./_components/registration-form";


export default async function page() {
  const resp = await getSettings()
  if (resp?.error) {
    throw Error()
  }
  const settings = resp?.data
  console.log(settings?.registrationDeadline);

  return (
    <>
      {isExpiredDate(settings?.registrationDeadline) ? <RegistrationClosed settings={settings} /> : <RegisterForm />}

    </>
  );
}