# blog-db-backup

blog backup

## job
0 */1 * * *  sh /var/www/ghost/content/data/blog-db-backup/start.sh > /var/www/ghost/content/data/upload.log
