import Link from "next/link";

const HomePage = () => {
    return ( 
        <div className="text-2xl text-red-400">Home Page
        
        <h1>Welcome</h1>

        <Link href='/properties'> Go To Properties</Link>
        </div>
     );
}
 
export default HomePage;