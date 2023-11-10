import clsx from 'clsx';

const PaymentPrice = ({
  amount,
  currencyCode = 'USD',
}) => (
  <>
  <p suppressHydrationWarning={true}  className='text-black text-[1rem] font-bold'>
    <span className={clsx('ml-1 inline')}>{`${currencyCode}`}</span>
    <span className={clsx('ml-1 inline')}>{`${amount}`}</span>
  </p>
</>
);

export default PaymentPrice;
