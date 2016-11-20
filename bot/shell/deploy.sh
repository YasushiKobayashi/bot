#!/bin/sh
aws deploy create-deployment \
  --application-name blog \
  --s3-location bucket=deploy.blog,key=deploy.zip,bundleType=zip,eTag="1fba376f474d5a91ef0ff826bb1b1bb6" \
  --deployment-group-name blog \
  --region ap-northeast-1
