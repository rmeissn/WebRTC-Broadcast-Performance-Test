#!/usr/bin/gnuplot

reset
set terminal pngcairo size 1920,1080
#set terminal svg
#set terminal pdfcairo
#set terminal dumb
set output "plot.png"

set datafile separator ";"
set xlabel 'Peers'
set xtics nomirror
#set xrange[0:25]
set style line 10 linecolor rgb "#F4511E" linewidth 1.5 pointtype 2 pointsize default #orange
set style line 1 linecolor rgb "#F4511E" linewidth 2 dashtype "." pointtype 2 pointsize default #orange
set style line 2 linecolor rgb "#43A047" linewidth 2 dashtype "-" pointtype 3 pointsize default #green
set style line 3 linecolor rgb "#1E88E5" linewidth 2 dashtype "._" pointtype 6 pointsize default #blue
set style line 4 linecolor rgb "#5E35B1" linewidth 2 dashtype "..-" pointtype 8 pointsize default #purple
set style data lines

set style line 11 lc rgb '#707070' lt 1 lw 1
set grid back ls 1 lc rgb '#707070' lw 0.7
set border back ls 11

#set lmargin at screen 0.25
set rmargin at screen 0.9

set multiplot
############################## first plot

#set style boxplot outliers pointtype 7
#set style data boxplot
set boxwidth  0.5

set ytics nomirror
set ytics 1
set yrange[-5:5]
set ylabel "delay in ms" textcolor rgb "#F4511E"
plot 'result.csv' using 1:4 ls 1 title "delay" with linespoints axes x1y1, 'result.csv' using 1:4:6 ls 10 notitle with errorbars axes x1y1

############################## second plot

set y2tics 20
set y2range[0:100]
set y2label "cpu usage in %" textcolor rgb "#43A047" offset -4.5, 0
set key spacing 6
plot 'result.csv' using 1:7 ls 2 title "cpu" with linespoints axes x1y2

############################## third plot

set y2tics 1.6 offset  4, 0
set y2range[0:8]
set y2label "memory usage in GB" textcolor rgb "#1E88E5" offset  -0.3, 0
set key spacing 10
plot 'result.csv' using 1:($11/1024/1014) ls 3 title "memory" with linespoints axes x1y2

############################## fourth plot

set y2tics 20 offset  8, 0
set y2range[0:100]
set y2label "network usage in MB/s" textcolor rgb "#5E35B1" offset  3.6, 0
set key spacing 15
plot 'result.csv' using 1:(($8+$9)/1024) ls 4 title "network" with linespoints axes x1y2

unset multiplot
