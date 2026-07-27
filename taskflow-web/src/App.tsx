import { Card, CardHeader, CardFooter } from "./shared/components/Card";
function App() {
return (
<div className="p-8">
<Card>
  <CardHeader>Task status</CardHeader>
<p>3 of 4 tasks completed.</p>
<CardFooter>Last updated 2 minutes ago</CardFooter>
</Card>
</div>
);
}
export default App;