import clsx from 'clsx';

const Price = ({
  amount,
  currencyCode = 'USD',
}) => (
  <p suppressHydrationWarning={true}  className='p-1 rounded-md gap-2 border border-gray-200 text-gray-800'>
    <span className={clsx('ml-1 inline')}>{`${amount}`}</span>
    <span className={clsx('ml-1 inline')}>{`${currencyCode}`}</span>
  </p>
);

export default Price;
