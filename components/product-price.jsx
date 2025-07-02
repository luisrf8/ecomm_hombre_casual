import clsx from 'clsx';

const Price = ({
  amount,
  currencyCode = 'USD',
}) => (
  <>
  <p suppressHydrationWarning={true}  className='text-black text-[2rem]'>
    <span className={clsx('ml-1 inline')}>{`${currencyCode}`}</span>
    <span className={clsx('ml-1 inline')}>{`${amount}`}</span>
  </p>
  {/* <span className={clsx('ml-1 inline text-[#022368] font-bold')}>Precio al mayor:</span> */}
  {/* <span className={clsx('ml-1 inline text-[#022368] font-bold')}>USD 15.00</span> */}
</>
);

export default Price;
