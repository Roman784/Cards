import ModuleList from "../components/module/ModuleList";

export default function BoardPage() {
  return (
    <>
      <h3 className="title">Board</h3>
      
      <ModuleList requestUrl="https://localhost:7010/modules" />
    </>
  );
}