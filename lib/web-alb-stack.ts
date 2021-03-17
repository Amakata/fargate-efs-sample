import * as ec2 from "@aws-cdk/aws-ec2";
import * as elb from "@aws-cdk/aws-elasticloadbalancingv2";
import * as cdk from '@aws-cdk/core';

interface WebAlbStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  webAlbSg: ec2.ISecurityGroup;
}

export class WebAlbStack extends cdk.Stack {
  webAlb: elb.IApplicationLoadBalancer;
  webListner: elb.IApplicationListener;

  constructor(scope: cdk.App, id: string, props: WebAlbStackProps) {
    super(scope, id, props);

    this.webAlb = new elb.ApplicationLoadBalancer(this, 'webLB', {
      internetFacing: true,
      loadBalancerName: 'web-alb',
      securityGroup: props.webAlbSg,
      vpc: props.vpc,
      vpcSubnets: { subnets: props.vpc.publicSubnets },
    });
    this.webListner = this.webAlb.addListener('webLBListner', {
      port: 80,
      defaultAction: elb.ListenerAction.fixedResponse(503),
    } );
  }
}
