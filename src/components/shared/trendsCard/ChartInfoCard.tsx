import type { FunctionComponent } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

import { Area, AreaChart, CartesianGrid } from 'recharts'

import { Calendar, Eye, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type cardType = "books" | "reviews" | "views" 

interface IChartInfoCardProps {
    cardType: cardType
    percentage: number
    rating?: number
    booksCount?: number,
    reviewsCount?: number
    views?: number
}

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-1)',
    },
} satisfies ChartConfig

const ChartInfoCard: FunctionComponent<IChartInfoCardProps> = ({ cardType, percentage, rating, booksCount, reviewsCount, views }) => {

    const { t } = useTranslation()

    const cardConfig = {
        books: {
            title: t('dashboard.cardTitle.amountBooks'),
            icon: Calendar,
            iconColor: '#2369DC',
            iconBg: '#ECF3FF',
        },
        reviews: {
            title: t('dashboard.cardTitle.amountReviews'),
            icon: Star,
            iconColor: '#8F6C00',
            iconBg: '#FDF8E6',
            rating: 4.3
        },
        views: {
            title: t('dashboard.cardTitle.amountViews'),
            icon: Eye,
            iconColor: '#9E4AED',
            iconBg: '#F7EEFF',
        },
    } as const;

    const Icon = cardConfig[cardType].icon

    return (
        <Card className='max-w-[370px] w-full shadow-none rounded-sm flex flex-col justify-between'>
            <CardHeader className='flex items-center justify-between'>
                {cardType && cardConfig[cardType] && (
                    <>
                        <CardTitle className='text-lg font-semibold'>
                            {cardConfig[cardType].title}
                        </CardTitle>
                        <CardDescription>
                            <Icon
                                size={30}
                                strokeWidth={2}
                                color={cardConfig[cardType].iconColor}
                                className='p-1.5 rounded-sm'
                                style={{ backgroundColor: `${cardConfig[cardType].iconBg}` }}
                            />
                        </CardDescription>
                    </>
                )}
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>

                {cardType === 'books' && (
                    <>
                        <div className="count text-4xl font-semibold">
                            { booksCount }
                        </div>
                        <div className="info text-sm font-medium">
                            { percentage >= 0 ? (
                                <span className='text-[#21C55D]'>+{ percentage }% { t("dashboard.card.comparePercent") }</span>
                            ) : (
                                <span className='text-[#c52121]'>{ percentage }% { t("dashboard.card.comparePercent") }</span>
                            )}
                        </div>
                    </>
                )}

                {cardType === 'reviews' && (
                    <div className='flex flex-col gap-3'>
                        <div className="reviews flex justify-between">
                            <div className="avg flex items-center gap-2">
                                <span className='text-[#8F6C00] text-xl font-bold'>{ rating }</span>  <span className='font-light text-sm text-[#6C6C6C]'>{ t("dashboard.card.reviewsAvg") }</span>
                            </div>
                            <div className="reviews-cnt flex items-center gap-2">
                                <span className='font-bold text-xl'>{ reviewsCount }</span> <span className='font-light text-sm text-[#6C6C6C]'>{ t("dashboard.card.reviewsCnt") }</span>
                            </div>
                        </div>
                        <div className="stars-stats flex flex-col gap-3">
                            <div className="stars flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < Math.floor(rating ? rating : 0) ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-500'}
                                    />
                                ))}
                            </div>
                            <div className="info text-sm font-medium">
                            { percentage >= 0 ? (
                                <span className='text-[#21C55D]'>+{ percentage }% { t("dashboard.card.comparePercent") }</span>
                            ) : (
                                <span className='text-[#c52121]'>{ percentage }% { t("dashboard.card.comparePercent") }</span>
                            )}
                        </div>
                        </div>
                    </div>
                )}

                {cardType === 'views' && (
                    <>
                        <div className="count flex items-center gap-2">
                            <span className='text-2xl font-bold'>{ views }</span>
                            <span className='text-[#6C6C6C] font-light'>{ t("dashboard.cardTitle.viewsCnt") }</span>
                        </div>
                        <div className="info text-sm font-medium">
                            { percentage >= 0 ? (
                                <span className='text-[#21C55D]'>+{ percentage }% { t("dashboard.card.comparePercent") }</span>
                            ) : (
                                <span className='text-[#c52121]'>{ percentage }% { t("dashboard.card.comparePercent") }</span>
                            )}
                        </div>
                    </>
                )}

            </CardContent>
            <CardFooter>
                <ChartContainer config={chartConfig} className='h-[40px] w-full p-0'>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="lightGreen"
                            fillOpacity={0.4}
                            stroke="lightGreen"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardFooter>
        </Card>
    )
}

export default ChartInfoCard