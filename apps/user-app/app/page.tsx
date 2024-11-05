import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import { authOptions } from "./lib/auth";
import Link from 'next/link';
import Image from "next/image";


export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/account-details');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex felx-col bg-slate-100 justify-between border-b-2 px-4 border-gray-300">
        <div className="flex items-center mx-3 my-2 text-4xl font-bold">
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/wallet.png"
            alt="wallet"
            className="mr-2"
          />
          EchoPay
        </div>
        <div className=" flex justify-between space-x-2 mr-2 font-bold text-xl">
          <span className="my-auto"> Your Financial Partner</span><span className="my-auto">  <img width="48" height="48" src="https://img.icons8.com/doodle/48/handshake--v1.png" alt="handshake--v1"/></span>
          </div>
      </header>
      
      <main className="flex flex-col md:flex-row items-center justify-between  flex-grow p-4">
  <div className="flex flex-col  md:w-1/2 mb-2 md:mb-0">
    <h1 className="text-6xl font-bold mb-6 ml-2">Welcome!</h1>
    <h2 className="text-4xl font-bold mb-6 ml-2"> All Your Payments, One Tap Away.</h2>
    <p className="text-lg mb-4 ml-2">Unlock your wallet with a quick sign-in</p>
    <Link href="/api/auth/signin" className="w-24">
      <button className="px-4 py-2  text-white ml-2 bg-gray-950 rounded-lg hover:bg-gray-700">
        Sign In
      </button>
    </Link>
  </div>
  
  <div className="flex items-center justify-center md:w-1/2">
    <Image
      src="/paytm-bg.webp" 
      alt="Example"
      width={465}
      height={465}
    />
  </div>
</main>


      <footer className=" text-center p-4 ">
        <div className="mx-auto flex items-center justify-between">
          <div>
            <p>&copy; {new Date().getFullYear()} EchoPay</p>
            <p>All rights reserved.</p>
          </div>
          <div>
            <p>Made by- Karanpreet Singh</p>
          </div>
          <div className="flex justify-between space-x-6">
            <a href="https://github.com/Kp-Singh09">
              <svg
                height="32"
                viewBox="0 0 72 72"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M36,72 L36,72 C55.882251,72 72,55.882251 72,36 L72,36 C72,16.117749 55.882251,-3.65231026e-15 36,0 L36,0 C16.117749,3.65231026e-15 -2.4348735e-15,16.117749 0,36 L0,36 C2.4348735e-15,55.882251 16.117749,72 36,72 Z"
                    fill="#3E75C3"
                  />
                  <path
                    d="M35.9985,12 C22.746,12 12,22.7870921 12,36.096644 C12,46.7406712 18.876,55.7718301 28.4145,58.9584121 C29.6145,59.1797862 30.0525,58.4358488 30.0525,57.7973276 C30.0525,57.2250681 30.0315,55.7100863 30.0195,53.6996482 C23.343,55.1558981 21.9345,50.4693938 21.9345,50.4693938 C20.844,47.6864054 19.2705,46.9454799 19.2705,46.9454799 C17.091,45.4500754 19.4355,45.4801943 19.4355,45.4801943 C21.843,45.6503662 23.1105,47.9634994 23.1105,47.9634994 C25.2525,51.6455377 28.728,50.5823398 30.096,49.9649018 C30.3135,48.4077535 30.9345,47.3460615 31.62,46.7436831 C26.2905,46.1352808 20.688,44.0691228 20.688,34.8361671 C20.688,32.2052792 21.6225,30.0547881 23.1585,28.3696344 C22.911,27.7597262 22.0875,25.3110578 23.3925,21.9934585 C23.3925,21.9934585 25.4085,21.3459017 29.9925,24.4632101 C31.908,23.9285993 33.96,23.6620468 36.0015,23.6515052 C38.04,23.6620468 40.0935,23.9285993 42.0105,24.4632101 C46.5915,21.3459017 48.603,21.9934585 48.603,21.9934585 C49.9125,25.3110578 49.089,27.7597262 48.8415,28.3696344 C50.3805,30.0547881 51.309,32.2052792 51.309,34.8361671 C51.309,44.0917119 45.6975,46.1292571 40.3515,46.7256117 C41.2125,47.4695491 41.9805,48.9393525 41.9805,51.1877301 C41.9805,54.4089489 41.9505,57.0067059 41.9505,57.7973276 C41.9505,58.4418726 42.3825,59.1918338 43.6005,58.9554002 C53.13,55.7627944 60,46.7376593 60,36.096644 C60,22.7870921 49.254,12 35.9985,12"
                    fill="#FFF"
                  />
                </g>
              </svg>
            </a>
            <a  href="https://www.linkedin.com/in/kp-singh-/" >
              <svg
                enableBackground="new 0 0 32 32"
                height="32px"
                id="Layer_1"
                version="1.0"
                viewBox="0 0 32 32"
                width="32px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <circle clipRule="evenodd" cx="16" cy="16" fill="#007BB5" fillRule="evenodd" r="16" />
                  <g>
                    <rect fill="#FFFFFF" height="14" width="4" x="7" y="11" />
                    <path
                      d="M20.499,11c-2.791,0-3.271,1.018-3.499,2v-2h-4v14h4v-8c0-1.297,0.703-2,2-2c1.266,0,2,0.688,2,2v8h4v-7 C25,14,24.479,11,20.499,11z"
                      fill="#FFFFFF"
                    />
                    <circle cx="9" cy="8" fill="#FFFFFF" r="2" />
                  </g>
                </g>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

