import * as ec2 from "@aws-cdk/aws-ec2";
import * as efs from "@aws-cdk/aws-efs";
import * as cdk from '@aws-cdk/core';


interface EfsStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  fsSg: ec2.ISecurityGroup;
}

export class EfsStack extends cdk.Stack {
  public readonly filesystem: efs.IFileSystem;

  constructor(scope: cdk.App, id: string, props: EfsStackProps) {
    super(scope, id, props);

    this.filesystem = new efs.FileSystem(this, 'fs', {
      vpc: props.vpc,
      securityGroup: props.fsSg,
      encrypted: true,
      vpcSubnets: {
        subnets: props.vpc.selectSubnets({subnetType: ec2.SubnetType.ISOLATED}).subnets,
      },
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS, 
      performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
    });
  }
}
