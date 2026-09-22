interface Props {
   title: string;
   subtitle: string;
}

export const AdminTitle = ({ title, subtitle }: Props) => {
   return (
      <div className='flex flex-col gap-2'>
         <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
         <p className='text-muted-foreground'>{subtitle}</p>
      </div>
   );
};
