import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-black p-10 mx-0 mt-8">
      <div className="max-w-[1270px] mx-auto flex flex-col lg:flex-row gap-5 lg:justify-between lg:hidden">
        <div className="mx-auto lg:mx-0 md:mx-0 md:flex md:justify-between">
          {/* left */}
          <div>
            <div className="flex gap-[10px] items-center my-2">
              <div><img src="/images/logo.webp" alt="Peddy Logo" /></div>
              <div>
                <p className="font-extrabold text-white text-[32px]">Peddy</p>
              </div>
            </div>
            <p className="text-gray-200 text-[16px]">
              Location: av. Washington 165, NY CA 54003 <br />
              Phone: +31 85 964 47 25 <br />
              Email: info@yourdomain.com <br />
              Openings hours: 9.00 AM - 5.00 PM
            </p>

            <div className="flex gap-3 mt-7 items-center">
              <div><img src="/images/Group 2.png" alt="Social media" /></div>
              <div><img src="/images/x-2 1.png" alt="Social media" /></div>
              <div><img src="/images/Group 6.png" alt="Social media" /></div>
              <div><img src="/images/Group 7.png" alt="Social media" /></div>
            </div>
          </div>

          {/* middle */}
          <div>
            <h1 className="font-bold text-white text-[18px] my-2">Useful Links</h1>
            <ul className="text-gray-300 text-[16px]">
              <li className="font-normal lato-normal text-[16px]"><a className="lato-normal" href="">Home</a></li>
              <li><a href="">About Use</a></li>
              <li><a href="">Animals</a></li>
              <li><a href="">Foundation</a></li>
              <li><a href="">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* right */}
        <div>
          <h1 className="font-bold text-white text-[18px] my-2">Drop a Message</h1>
          <input type="text" placeholder="Enter your email" className="bg-footer-bg p-3 w-full rounded-xl text-gray-500 focus:border-none" />
          <br />
          <button className="btn bg-button-bg w-full my-3 border-none rounded-xl text-gray-200 hover:bg-button-bg/80">Subscribe</button>
        </div>
      </div>

      <div className="max-w-[1270px] mx-auto lg:flex lg:flex-row gap-5 lg:justify-between hidden lg:block">
        {/* left */}
        <div>
          <div className="flex gap-[10px] items-center my-2">
            <div><img src="/images/logo.webp" alt="Peddy Logo" /></div>
            <div>
              <p className="font-extrabold text-white text-[32px]">PawNest</p>
            </div>
          </div>
          <p className="text-gray-200 text-[16px]">
            Location: av. Washington 165, NY CA 54003 <br />
            Phone: +31 85 964 47 25 <br />
            Email: info@yourdomain.com <br />
            Openings hours: 9.00 AM - 5.00 PM
          </p>

          <div className="flex gap-3 mt-7 items-center">
            <div><img src="/images/Group 2.png" alt="Social media" /></div>
            <div><img src="/images/x-2 1.png" alt="Social media" /></div>
            <div><img src="/images/Group 6.png" alt="Social media" /></div>
            <div><img src="/images/Group 7.png" alt="Social media" /></div>
          </div>
        </div>

        {/* middle */}
        <div>
          <h1 className="font-bold text-white text-[18px] my-2">Useful Links</h1>
          <ul className="text-gray-300 text-[16px]">
            <li className="font-normal lato-normal text-[16px]"><a className="lato-normal" href="">Home</a></li>
            <li><a href="">About Use</a></li>
            <li><a href="">Animals</a></li>
            <li><a href="">Foundation</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </div>

        {/* right */}
        <div>
          <h1 className="font-bold text-white text-[18px] my-2">Drop a Message</h1>
          <input type="text" placeholder="Enter your email" className="bg-footer-bg p-3 w-full rounded-xl text-gray-500 focus:border-none" />
          <br />
          <button className="btn bg-button-bg w-full my-3 border-none rounded-xl text-gray-200 hover:bg-button-bg/80">Subscribe</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer 