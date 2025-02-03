import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

interface StatsCardProps{
    title:string;
    value:number;
}

const StatsCard:React.FC<StatsCardProps> = ({title, value}) => {
  return (
    <Card className="bg-muted">
        <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="capitalize">{title}</CardTitle>
            <CardDescription className='text-4xl font-semibold text-primary mt[0px!important]'>
                {value}
            </CardDescription>
        </CardHeader>
    </Card>
  )
}

export default StatsCard;