import * as ecr from "@aws-cdk/aws-ecr";
import * as cdk from '@aws-cdk/core';

interface EcrStackProps extends cdk.StackProps {
}

export class EcrStack extends cdk.Stack {
  public readonly repository: ecr.IRepository;
  
  constructor(scope: cdk.App, id: string, props: EcrStackProps) {
    super(scope, id, props);

    this.repository = new ecr.Repository(this, 'WebRepository', {
      repositoryName: 'web'
    });
  }
}