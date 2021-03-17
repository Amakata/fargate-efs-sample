#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { EcsStack } from '../lib/ecs-stack';
import { EfsStack } from '../lib/efs-stack';
import { NetworkStack } from '../lib/network-stack';
import { SgStack } from '../lib/sg-stack';
import { WebAlbStack } from '../lib/web-alb-stack';

const env = { 
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();
const network_stack = new NetworkStack(app, 'NetworkStack', {env: env});
const sg_stack = new SgStack(app, 'SgStack', {vpc: network_stack.vpc, env: env});
sg_stack.addDependency(network_stack);
const efs_stack = new EfsStack(app, 'EfsStack', {vpc: network_stack.vpc, fsSg: sg_stack.fsSg, env: env});
efs_stack.addDependency(network_stack);
efs_stack.addDependency(sg_stack);
const web_alb_stack = new WebAlbStack(app, 'WebAlbStack', {vpc: network_stack.vpc, webAlbSg: sg_stack.webAlbSg, env: env});
web_alb_stack.addDependency(network_stack);
web_alb_stack.addDependency(sg_stack);
const ecs_stack = new EcsStack(app, 'EcsStack', {vpc: network_stack.vpc, webLBListner: web_alb_stack.webListner, env: env});
ecs_stack.addDependency(network_stack);
ecs_stack.addDependency(web_alb_stack);
