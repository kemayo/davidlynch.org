task :default => :auto

desc 'Clean up generated site'
task :clean do
  cleanup
end

desc 'Test site output for Liquid template errors'
task :test => :build do
  errors = `grep --exclude Rakefile -R 'Liquid error:' _site`
  if errors.nil? || errors.empty?
    puts "No errors"
  else
    puts "Errors:"
    puts errors.inspect
    exit 1
  end
end

desc 'Build site with Jekyll'
task :build => :clean do
  submodule('update')
  jekyll('--lsi')
end

desc 'Start server with --auto'
task :server => :clean do
  jekyll('--server --auto')
end

desc 'Build and deploy'
task :deploy => :build do
  user = 'davidlynch'
  host = 'davidlynch.org'
  directory = '~/davidlynch.org'
  sh 'rsync -rtzh --progress --delete _site/ #{user}@#{host}:#{directory}'
end

def cleanup
  sh 'rm -rf _site'
end

def jekyll(opts = '')
  sh 'jekyll ' + opts
end

def submodule(opts = '')
  sh 'git submodule ' + opts
end