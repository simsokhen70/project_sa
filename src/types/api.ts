export type Api ={
  projectID: string,
  creator: string,
  actionId: string,
  actionName: string,
  description: string,
  packageName: string,
  apiDomain: string,
  reqBodyType: string,
  input: [
    string
  ],
  output: [
    string
  ],
  fileNames: [
    string
  ]
}