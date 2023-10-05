import clsx from 'clsx';

const Price = ({
  amount,
  currencyCode = 'USD',
}) => (
  <p suppressHydrationWarning={true} >
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(parseFloat(amount))}`}
    <span className={clsx('ml-1 inline')}>{`${currencyCode}`}</span>
  </p>
);

export default Price;
