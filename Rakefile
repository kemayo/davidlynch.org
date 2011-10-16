task :default => :auto

desc 'Clean up generated site'
task :clean do
  cleanup
end

desc 'Build site with Jekyll'
task :build => :clean do
  jekyll('--lsi')
end

desc 'Auto-rebuild the site, no server'
task :auto => :clean do
  jekyll('--no-server --auto')
end

desc 'Start server with --auto'
task :server => :clean do
  # compass
  jekyll('--server --auto')
end

desc 'Build and deploy'
task :deploy => :build do
  sh 'rsync -rtzh --progress --delete _site/ username@servername:/var/www/websitename/'
end

def cleanup
  sh 'rm -rf _site'
end

def jekyll(opts = '')
  sh 'jekyll ' + opts
end
