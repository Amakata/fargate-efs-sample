import * as ec2 from "@aws-cdk/aws-ec2";
import * as elb from "@aws-cdk/aws-elasticloadbalancingv2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as cdk from '@aws-cdk/core';

interface EcsStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  webLBListner: elb.IApplicationListener;
}

export class EcsStack extends cdk.Stack {
  public readonly cluster: ecs.ICluster;
  
  constructor(scope: cdk.App, id: string, props: EcsStackProps) {
    super(scope, id, props);

    this.cluster = new ecs.Cluster(this, 'WebCluster', {
      clusterName: 'WebCluster',
      vpc: props.vpc
    })

  }
}