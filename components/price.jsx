import clsx from 'clsx';

const Price = ({
  amount,
  currencyCode = 'USD',
}) => (
  <p suppressHydrationWarning={true}  className='text-white p-1 rounded-md gap-2' style={{backgroundColor: '#FFB406'}}>
    <span className={clsx('ml-1 inline')}>{`${currencyCode}`}</span>
    <span className={clsx('ml-1 inline')}>{`${amount}`}</span>
  </p>
);

export default Price;
