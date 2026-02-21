import { InfinitySpin } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
   <InfinitySpin
width="200"
color="#0d3b66"
/>
</div>
  );
}