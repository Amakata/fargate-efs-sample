#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { FargateEfsStack } from '../lib/fargate-efs-stack';

const app = new cdk.App();
new FargateEfsStack(app, 'FargateEfsStack');
