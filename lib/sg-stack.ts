import * as ec2 from "@aws-cdk/aws-ec2";
import * as cdk from '@aws-cdk/core';

interface SgStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class SgStack extends cdk.Stack {
  public readonly fsSg: ec2.ISecurityGroup;
  public readonly webAlbSg: ec2.ISecurityGroup;

  constructor(scope: cdk.App, id: string, props: SgStackProps) {
    super(scope, id, props);

    this.fsSg = new ec2.SecurityGroup(this, 'fsSG', {
      allowAllOutbound: true,
      securityGroupName: 'fs-sg',
      vpc: props.vpc,
    });

    this.webAlbSg = new ec2.SecurityGroup(this, 'webLBSG', {
      allowAllOutbound: true,
      securityGroupName: 'web-alb-sg',
      vpc: props.vpc,
    });
    this.webAlbSg .addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80));
  }
}
