import { MailingForm } from '../../business-components/Mailing/Form';

export function CreateMailingsPage() {
  const handleFormData = ({ message }: { message: string }) => {
    console.log(message);
  };
  return (
    <div className="w-full">
      <MailingForm onSubmit={handleFormData} />
    </div>
  );
}
