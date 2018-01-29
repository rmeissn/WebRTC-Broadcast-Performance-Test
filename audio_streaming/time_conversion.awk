BEGIN {
  FS = ";";
  OFS = ";";
}
{
  if (NR != 1) command = "date -d ""\""$1"\""" +%s";
  if (NR != 1) command | getline $1;
  if (NR != 1) close(command);
  print;
}
END {

}
