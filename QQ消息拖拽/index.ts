function getname(name?:string[] | undefined): number {
  return name!.length
}
getname(['123'])