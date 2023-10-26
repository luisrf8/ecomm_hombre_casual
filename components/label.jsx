import clsx from 'clsx';
import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode,
  position = 'bottom'
}) => {
  return (
    <div
      className={clsx('absolute bottom-0 left-0 flex justify-center mb-5 w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': position === 'center'
      })}
    >
      <div className="flex items-center rounded-md border p-2 text-md text-black font-semibold bg-white">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{title}</h3>
        <Price
          className="flex-none rounded-full bg-orange-600 p-2 text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
