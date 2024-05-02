import ModuleList from "../components/module/ModuleList";

export default function BoardPage() {
  return (
    <>
      <ModuleList requestUrl="https://localhost:7010/modules" />
    </>
  );
}